import { Button, Col, Container, Table } from "react-bootstrap";
import PageHeader from "../../../components/web/header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { currencyHandler } from "../../../helpers/currencyHandler";
import { useMediaQuery } from "react-responsive";
import {
  getWishlistThunk,
  moveWishlistToCartThunk,
  postWishlistThunk,
} from "../../../store/actions";
import { useEffect } from "react";
import useConfirmationAlert from "../../../components/common/sweetAlerts/ConfirmationAlert";
import NoRecord from "../../../components/web/displayMessagePages/NoRecord";
import { Link } from "react-router-dom";
import { CLIENT } from "../../../routes/routesConstants";

const Wishlist = () => {
  const { data } = useSelector((store) => store.Wishlist);
  const wishListId = data?.[0]?._id;
  const productItems = data?.[0]?.products || [];
  const variantItems = data?.[0]?.variants || [];
  const items = [...productItems, ...variantItems];
  const isLargeScreen = useMediaQuery({ minWidth: 768 });
  const dispatch = useDispatch();
  const triggerConfirmation = useConfirmationAlert({
    icon: "question",
    confirmButtonText: "Remove",
    cancelButtonText: "Move to Cart",
  });

  const handleRemoveWishlist = async (id) => {
    triggerConfirmation({
      dispatchFunction: async () => {
        const response = await dispatch(postWishlistThunk(id));
        if (postWishlistThunk.fulfilled.match(response)) {
          return true;
        }
        return false;
      },
      cancelDispatchFunction: async () => {
        const response = await dispatch(
          moveWishlistToCartThunk({ id: wishListId, productId: id })
        );
        if (moveWishlistToCartThunk.fulfilled.match(response)) {
          return true;
        } else return false;
      },
    });
    // triggerConfirmation({
    //   dispatchFunction: async () => dispatch(postWishlistThunk(id + id)),
    //   thunkProvider: postWishlistThunk,
    // });
  };

  useEffect(() => {
    dispatch(getWishlistThunk());
  }, []);

  const handleMoveWishlistToCart = (value) => {
    dispatch(moveWishlistToCartThunk({ id: wishListId, productId: value.id }));
  };

  return (
    <section className="page-content">
      <Container>
        {items.length > 0 ? (
          <>
            <PageHeader title="Home" pageTitle="wishlist" />
            <div className="paddingY">
              <div>
                {isLargeScreen ? (
                  <Table responsive="lg" bordered className="text-center">
                    <thead className="">
                      <tr>
                        <td className="bg-color-titan-white text-color-primary text-center">
                          Remove
                        </td>
                        <td className="bg-color-titan-white text-color-primary text-center">
                          Product Image
                        </td>
                        <td className="bg-color-titan-white text-color-primary text-center">
                          Product Name
                        </td>
                        {/* <td className="bg-color-titan-white text-color-primary text-center">
                      Quantity
                    </td> */}
                        <td className="bg-color-titan-white text-color-primary text-center">
                          Price
                        </td>
                        <td className="bg-color-titan-white text-color-primary text-center">
                          Price
                        </td>
                      </tr>
                    </thead>
                    <tbody className="table-cell-paddingX-20px">
                      {items &&
                        items?.map((items, index) => {
                          const grandTotal = items?.grandTotal;
                          const file = items?.files && items?.files[0]?.urls;
                          const title = items?.title;
                          let redirecTo;
                          if (items?.product?.slug) {
                            redirecTo = `${items?.product?.slug}?variant=${items?.slug}`;
                          } else {
                            redirecTo = items?.slug;
                          }
                          return (
                            <tr key={index}>
                              <td className="align-middle  w-150px">
                                <i
                                  className="ri-close-circle-line fs-24 text-color-secondary cursor-pointer"
                                  onClick={() =>
                                    handleRemoveWishlist(items._id)
                                  }
                                ></i>
                              </td>
                              <td className="w-200px">
                                <Link
                                  target="_blank"
                                  to={`${CLIENT.PRODUCT_DETAILS}/${redirecTo}`}
                                >
                                  <div className=" cart-img br-5 overflow-hidden">
                                    <img
                                      className="h-100 object-fit-cover w-100 br-5 overflow-hidden"
                                      src={file}
                                      alt=""
                                    />
                                  </div>
                                </Link>
                              </td>
                              <td className="align-middle max-w-200px">
                                <Col xl={10} className="mx-auto">
                                  <Link
                                    target="_blank"
                                    to={`${CLIENT.PRODUCT_DETAILS}/${redirecTo}`}
                                  >
                                    <h6 className="fs-14 text-capitalize text-color-primary fw-medium mb-1">
                                      {title}
                                    </h6>
                                  </Link>
                                </Col>
                              </td>
                              {/* <td className="align-middle w-150px">
                            <div className="d-flex align-items-center justify-content-center">
                              <i className="ri-indeterminate-circle-line fs-24 text-color-secondary"></i>
                              <span>
                                <p className="m-0 mx-2">{quantity}</p>
                              </span>
                              <i className="ri-add-circle-line fs-24 text-color-secondary"></i>
                            </div>
                          </td> */}
                              <td className="align-middle w-200px">
                                <p className="text-color-primary m-0 fw-medium">
                                  {currencyHandler(grandTotal)}
                                </p>
                              </td>
                              <td className="align-middle w-200px">
                                <Button
                                  className="primary-btn fs-14"
                                  onClick={() =>
                                    handleMoveWishlistToCart({
                                      value: items,
                                      id: items._id,
                                    })
                                  }
                                >
                                  Add to cart
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                ) : (
                  <div>
                    {items &&
                      items?.map((items, index) => {
                        const grandTotal = items?.grandTotal;
                        const file = items?.files && items?.files[0]?.urls;
                        const title = items?.title;
                        let redirecTo;
                        if (items?.product?.slug) {
                          redirecTo = `${items?.product?.slug}?variant=${items?.slug}`;
                        } else {
                          redirecTo = items?.slug;
                        }
                        return (
                          <div key={index} className="mb-3">
                            <div className="d-flex">
                              <Col xs={4} sm={3}>
                                <Link
                                  target="_blank"
                                  to={`${CLIENT.PRODUCT_DETAILS}/${redirecTo}`}
                                >
                                  <div className="border border-color-light-gray p-2 p-sm-3 cart-img-sm">
                                    <img
                                      src={file}
                                      className="br-5 w-100 object-fit-cover"
                                      alt=""
                                    />
                                  </div>
                                </Link>
                              </Col>
                              <Col xs={8} sm={9} className="ps-3">
                                <div className="border border-color-light-gray">
                                  <div className="border-bottom border-color-light-gray py-2 px-3">
                                    <Link
                                      target="_blank"
                                      to={`${CLIENT.PRODUCT_DETAILS}/${redirecTo}`}
                                    >
                                      <h6 className="mb-1 text-color-primary text-capitalize fw-medium fs-12">
                                        {title}
                                      </h6>
                                    </Link>
                                  </div>
                                  <div className="border-bottom border-color-light-gray py-2 px-3">
                                    <i
                                      onClick={() =>
                                        handleRemoveWishlist(items._id)
                                      }
                                      className="ri-close-circle-line fs-20 text-color-secondary cursor-pointer"
                                    ></i>
                                  </div>
                                  {/* <div className="border-bottom border-color-light-gray py-2 px-3 d-flex align-items-center justify-content-between">
                                <p className="m-0 fs-12">Quantity</p>
                                <div className="d-flex align-items-center justify-content-center">
                                  <i className="ri-indeterminate-circle-line fs-20 text-color-secondary"></i>
                                  <span>
                                    <p className="m-0 mx-1 fs-12">{quantity}</p>
                                  </span>
                                  <i className="ri-add-circle-line fs-20 text-color-secondary"></i>
                                </div>
                              </div> */}
                                  <div className="py-2 px-3 border-bottom border-color-light-gray d-flex align-items-center justify-content-between">
                                    <p className="m-0 fs-12 text-color-primary fw-medium">
                                      Price
                                    </p>
                                    <p className="m-0 fs-12 text-color-primary fw-medium">
                                      {currencyHandler(grandTotal)}
                                    </p>
                                  </div>
                                  <div className="px-3 py-2">
                                    <Button
                                      className="primary-btn fs-14 py-0"
                                      onClick={() =>
                                        handleMoveWishlistToCart({
                                          value: items,
                                          id: items._id,
                                        })
                                      }
                                    >
                                      Add to cart
                                    </Button>
                                  </div>
                                </div>
                              </Col>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className={`paddingBottom mb-3 mb-md-0 mt-lg-5`}>
            <NoRecord
              title="Wishlist Empty !"
              message="Your wishlist is currently empty. Start adding items to save them for later !"
            />
          </div>
        )}
      </Container>
    </section>
  );
};

export default Wishlist;
