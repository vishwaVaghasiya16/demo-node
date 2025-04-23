import { debounce } from "lodash";
import { CLIENT } from "../routes/routesConstants";
import {
  createOrderPaymentThunk,
  razorpayPaymentCaptureThunk,
} from "../store/actions";
import { currencyEnum, expireDateValue } from "./enum";
import { toastError } from "./toastConfig";
import crypto from "crypto-js";
import { clearCart } from "../store/cart/slice";
import moment from "moment";

const debouncedToastError = debounce(
  (message) => {
    toastError(message);
  },
  3000,
  { leading: true, trailing: false }
);

export const timeElapsedSinceCreatedAt = (createdAt) => {
  if (createdAt) {
    const momentCreatedAt = moment(createdAt);
    const now = moment();

    const duration = moment.duration(now.diff(momentCreatedAt));

    if (duration.years() > 0) {
      const years = duration.years();
      return `${years} year${years > 1 ? "" : ""} ago`;
    } else if (duration.months() > 0) {
      const months = duration.months();
      return `${months} month${months > 1 ? "" : ""} ago`;
    } else if (duration.days() > 0) {
      const days = duration.days();
      return `${days} day${days > 1 ? "" : ""} ago`;
    } else if (duration.hours() > 0) {
      const hours = duration.hours();
      return `${hours} hour${hours > 1 ? "" : ""} ago`;
    } else if (duration.minutes() > 0) {
      const minutes = duration.minutes();
      return `${minutes} minute${minutes > 1 ? "" : ""} ago`;
    } else {
      return "Just now";
    }
  }
};

export const isWithinDays = (date) => {
  if (date) {
    const currentDate = moment().utc().startOf("day");

    const orderDateMoment = moment(date).utc().startOf("day");

    const diffInDays = currentDate.diff(orderDateMoment, "days");

    return diffInDays <= expireDateValue;
  }

  return false;
};

export const getQueryStringValues = () => {
  const url = new URL(window.location.href);
  const params = url.searchParams;

  let queryStringValues = {};

  for (const [key, value] of params.entries()) {
    queryStringValues[key] = value;
  }

  return queryStringValues;
};

export const capitalizeFirstWord = (str) => {
  return str.replace(/(^\w|\.\s*\w)/g, (match) => match.toUpperCase());
};

export const formatNumber = (num) => {
  if (num) {
    if (num >= 10000000) {
      return (num / 10000000).toFixed(1) + "Cr";
    }
    //  else if (num >= 100000) {
    //   return (num / 100000).toFixed(4) + "L";
    // }
    else if (num >= 1000) {
      return (num / 1000).toFixed(2) + "K";
    }
    return num.toString();
  }
};

export const formatPhoneNumber = (phoneNumber) => {
  if (phoneNumber) {
    const phoneNumberStr = phoneNumber.toString();
    if (phoneNumberStr && phoneNumberStr.length !== 10) {
      debouncedToastError(
        phoneNumberStr +
          " " +
          "Invalid phone number length. It should be 10 digits."
      );
    }

    const countryCode = "+91 ";
    const areaCode = phoneNumberStr.slice(0, 3);
    const firstPart = phoneNumberStr.slice(3, 6);
    const secondPart = phoneNumberStr.slice(6, 10);

    return `${countryCode} ${areaCode} ${firstPart} ${secondPart}`;
  }
};

export const formatDate = (date) => {
  if (date) {
    const newDate = new Date(date);
    const formattedCreatedAt = newDate.toISOString().split("T")[0];
    return formattedCreatedAt;
  }
};

export const isValidUrl = (value) => {
  try {
    const url = new URL(value);
    return (
      url.protocol === "http:" ||
      url.protocol === "https:" ||
      url.hostname === "localhost"
    );
  } catch (e) {
    return false;
  }
};

export const addSpacesToCamelCase = (str) => {
  if (str) return str.replace(/([A-Z])/g, " $1").trim();
};

// =======================================
//         Razorpay Function
// =======================================

const handlePayment = async (
  navigate,
  dispatch,
  enumsData,
  status,
  orderDetails = {}
) => {
  // Make API call to update payment status
  if (status === enumsData?.paymentStatusEnum?.COMPLETED) {
    const response = await dispatch(razorpayPaymentCaptureThunk(orderDetails));
    if (razorpayPaymentCaptureThunk.fulfilled.match(response)) {
      navigate(`${CLIENT.PAYMENT_RESPONSE}/${orderDetails.razorpayOrderId}`);
    }
  }
};

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      resolve(true);
    };
    script.onerror = (error) => {
      console.log("[ERROR]: ", error);
      resolve(false);
    };
  });
};

const displayRazorpay = async ({
  amount,
  currency,
  orderId,
  keyId,
  keySecret,
  enumsData,
  dispatch,
  navigate,
}) => {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    console.log("Razorpay SDK failed to load. Are you online?");
    return;
  }

  const options = {
    key: keyId,
    amount: amount * 100,
    currency,
    name: "Alukas & Co",
    description: "some description",
    image:
      "https://pms.logicgoinfotech.com/static/media/logo-sm-light.93f7aae5c96f8493d953bbaf80f9dc48.svg",
    order_id: orderId,
    handler: (response) => {
      const signatureToMatch = crypto
        .HmacSHA256(`${orderId}|${response.razorpay_payment_id}`, keySecret)
        .toString();

      const succeeded = signatureToMatch === response.razorpay_signature;

      const objectParameter = {
        razorpayOrderId: orderId,
        paymentId: response.razorpay_payment_id,
        signature: response.razorpay_signature,
      };

      if (succeeded) {
        handlePayment(
          navigate,
          dispatch,
          enumsData,
          enumsData?.paymentStatusEnum?.COMPLETED,
          objectParameter
        );
      } else {
        handlePayment(
          navigate,
          dispatch,
          enumsData,
          enumsData?.paymentStatusEnum?.FAILED,
          objectParameter
        );
      }
    },
    modal: {
      confirm_close: true,
      ondismiss: async (reason) => {
        const {
          reason: paymentReason,
          field,
          step,
          code,
        } = reason && reason.error ? reason.error : {};
        if (reason === undefined && enumsData?.paymentStatusEnum) {
          handlePayment(
            navigate,
            dispatch,
            enumsData,
            enumsData.paymentStatusEnum.CANCELED,
            {
              orderId,
            }
          );
        } else if (reason === "timeout") {
          handlePayment(
            navigate,
            dispatch,
            enumsData,
            enumsData?.paymentStatusEnum.TIMEOUT,
            {
              orderId,
            }
          );
        } else {
          handlePayment(
            navigate,
            dispatch,
            enumsData,
            enumsData?.paymentStatusEnum.FAILED,
            {
              orderId,
              paymentReason,
              field,
              step,
              code,
            }
          );
        }
      },
    },
  };

  const rzp1 = new window.Razorpay(options); // Create the Razorpay instance
  rzp1.open(); // Open the checkout modal
};

/**
 * Razorpay Function
 * Params must pass :-
 *    dispatch
 *    user
 *    orders
 *    enumsData
 */

export const RazorPayFunction = async ({
  navigate,
  dispatch,
  user,
  orders,
  enumsData,
}) => {
  try {
    if (Object.keys(user)?.length > 0 && orders?._id && enumsData) {
      // const pendingOrder = orders.filter(
      //   (ele) => ele.user._id === user._id && ele.isPaid === false
      // );

      // if (pendingOrder.length !== 0) {
      //   console.log("[ERROR]: Product order array length is more then 1");
      //   return toastError("Something went wrong! Please try again later.");
      // }

      // if (orders.length > 0 && orders.length <= 1) {
      const response = await dispatch(
        createOrderPaymentThunk({
          orderId: orders._id,
          currency: currencyEnum,
        })
      );

      if (createOrderPaymentThunk.fulfilled.match(response)) {
        if (Object.keys(response.payload.data)?.length > 0) {
          displayRazorpay({
            amount: String(response.payload.data?.amount),
            currency: response.payload.data?.currency || currencyEnum,
            orderId: response.payload.data?.razorpayOrderId,
            keyId: import.meta.env.VITE_RAZORPAY_KEY_ID,
            keySecret: import.meta.env.VITE_RAZORPAY_KEY_SECRET,
            enumsData,
            dispatch,
            navigate,
          });
        }
      }
      // }
    }
  } catch (error) {
    console.log("[ERROR]: ", error.message);
    return toastError("Something went wrong! Payment failed.");
  }
};
