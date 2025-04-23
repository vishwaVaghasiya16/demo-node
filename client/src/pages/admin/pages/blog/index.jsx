import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  blogPaginationThunk,
  deleteBlogThunk,
  getAllBlogs,
} from "../../../../store/actions";
import { getMomentDate } from "../../../../components/common/MomentFun";
import ToggleMenu from "../../../../components/admin/ToggleMenu";
import useClickOutside from "../../../../components/admin/useClickOutside";
import { useNavigate } from "react-router-dom";
import { ADMIN as admin } from "../../../../routes/routesConstants";
import { clearBlogDetails } from "../../../../store/blogs/slice";
import useConfirmationAlert from "../../../../components/common/sweetAlerts/ConfirmationAlert";
import VideoBlog from "./VideoBlog";
import YTVideoHandler from "../../../../components/common/YTVideoHandler";
import BreadCrumb from "../../../../components/admin/breadCrumb/BreadCrumb";
import { itemLimitEnum } from "../../../../helpers/enum";
import BlogLoader from "./BlogLoader";
import DynamicNoData from "../../../../components/common/dynamicNoData/DynamicNoData";

const Blog = () => {
  const { data, pagination, loading } = useSelector((store) => store.Blogs);
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(10);
  const [clickedMenuId, setClickedMenuId] = useState();
  const [editData, setEditData] = useState({});
  const [isShowModel, setIsShowModel] = useState(null);
  const nav = useNavigate();
  const ADMIN = admin();

  useClickOutside([".menu-popup-parent", ".menu-popup"], () =>
    setClickedMenuId(null)
  );

  const handleEdit = (id) => {
    nav(ADMIN.BLOG_EDITOR.path + `/${id}`);
  };

  useEffect(() => {
    if (!data?.length > 0) {
      dispatch(getAllBlogs({ limit: 8 }));
    }
  }, []);

  //   delete blog

  const triggerRoleConfirmation = useConfirmationAlert({
    icon: "error",
    title: "Confirm Delete Blog",
    text: "Are you sure you want to Delete the Blog?",
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
    confirmButton: "sweet-alert-green-button",
    cancelButton: "sweet-alert-red-button",
    successText: "Status has been successfully updated.",
  });

  const handleDelete = (id) => {
    triggerRoleConfirmation({
      dispatchFunction: async () => {
        const response = await dispatch(deleteBlogThunk(id));
        if (deleteBlogThunk.fulfilled.match(response)) {
          dispatch(getAllBlogs({ limit: 8 }));
          return true;
        }
        if (deleteBlogThunk.rejected.match(response)) {
          return false;
        }
      },
    });
  };

  // pagination

  const handlePagination = async () => {
    await dispatch(
      blogPaginationThunk({ limit: 8, page: pagination?.page + 1 })
    );
  };

  // model

  const handleModel = () => {
    setIsShowModel((pre) => !pre);
    setEditData({});
  };

  const formattedValue = (value) => {
    if (value >= 1000) {
      return {
        formatted: (value / 1000).toFixed(2),
        suffix: "k",
      };
    }
    return {
      formatted: value,
      suffix: "",
    };
  };

  return (
    <div className="py-20">
      <BreadCrumb
        title="Pages"
        subPageTitle="Blogs"
        // pageTitle="product"
      />
      <div className="d-flex gap-3 justify-content-end align-items-center bg-white p-3 br-5">
        {/* <Col sm={6} md={4} xl={3} className={`mb-`}>
          <div
            className={`select-tag-div px-2 br-5 overflow-hidden border common-border-color h-40`}
          >
            <select
              className={`fs-14 w-100 h-100 border-0 bg-transparent text-color-primary remove-focus-visible-outline`}
              aria-label="Default select example"
              value={limit}
              onChange={(e) => handleLimit(e.target.value)}
            >
              {itemLimitEnum?.map((item, key) => {
                return (
                  <option key={key} value={item}>
                    Show {item} item
                  </option>
                );
              })}
            </select>
          </div>
        </Col> */}
        <div className="gap-2 d-flex">
          <Button className="admin-primary-btn" onClick={handleModel}>
            Video Blog
          </Button>
          <VideoBlog
            edit={editData}
            showModel={isShowModel}
            hide={handleModel}
          />
          <Button
            className="admin-primary-btn"
            onClick={() => {
              nav(ADMIN.BLOG_EDITOR.path + "/add");
              dispatch(clearBlogDetails());
            }}
          >
            Text Blog
          </Button>
        </div>
      </div>
      <div>
        {!loading && data?.length > 0 ? (
          <Row>
            {data?.map((item, index) => {
              const image = item?.url;
              const video = item?.video;
              const date = item?.createdAt;
              const comment = item?.commentCount;
              const title = item?.title;
              const description = item?.description;
              const id = item?._id;
              const isVideo = item?.video ? true : false;
              const { formatted, suffix } = formattedValue(comment);
              return (
                <Col sm={6} md={4} xl={3} key={index} className="mt-20">
                  <div className="bg-white p-3 br-5">
                    {isVideo ? (
                      <YTVideoHandler
                        onClick={() => {
                          setEditData(item), setIsShowModel(true);
                        }}
                        url={video}
                        className={
                          " adminBlogImg object-fit-cover br-5 cursor-pointer"
                        }
                        thumbnail
                      />
                    ) : (
                      <img
                        onClick={() => handleEdit(title)}
                        src={image}
                        alt=""
                        className="w-100 br-5 adminBlogImg object-fit-cover cursor-pointer"
                      />
                    )}

                    <div>
                      <div className="d-flex mt-3 gap-2 align-items-center">
                        <p className="p-0 m-0 fs-12  fw-medium text-color-secondary">
                          {getMomentDate(date, "MMMM DD, YYYY")}
                        </p>
                        {/* <i className="ri-arrow-right-s-line opacity-50 text-color-secondary"></i> */}
                        {/* <p className="p-0 m-0 fs-12 fw-medium text-color-secondary">
                           {formatted + suffix} Comments
                        </p> */}
                      </div>
                      <div className="d-flex mt-2 justify-content-between align-items-center gap-3">
                        <h3 className="fs-14  mb-0 text-color-primary text-capitalize text-overflow-ellipsis ">
                          {title}
                        </h3>
                        <div className="">
                          <ToggleMenu
                            onClick={() =>
                              setClickedMenuId((pre) =>
                                pre == id ? false : id
                              )
                            }
                            isOpen={id == clickedMenuId}
                            margin="ms-auto"
                            iconColor="text-color-primary"
                          >
                            <p
                              className="text-color-secondary m-0 fs-14 hover-bg-color-titan-white cursor-pointer px-3 py-1 hover-color-primary"
                              onClick={
                                isVideo
                                  ? () => {
                                      setEditData(item), setIsShowModel(true);
                                    }
                                  : () => handleEdit(title)
                              }
                            >
                              Edit
                            </p>
                            <p
                              className="text-color-secondary m-0 fs-14 hover-bg-color-titan-white cursor-pointer px-3 py-1 hover-color-primary"
                              onClick={() => handleDelete(id)}
                            >
                              Delete
                            </p>
                          </ToggleMenu>
                        </div>
                      </div>
                      {/* <p className="fs-14 mt-1 text-color-secondary truncate-line-3">
                      {description}
                    </p> */}
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        ) : !loading ? (
          <DynamicNoData
            icon="unukghxb"
            title="Oops ! No Any Category Yet !"
            subTitle="Keep an eye on upcoming category !"
          />
        ) : (
          <BlogLoader />
        )}
        {pagination?.page < pagination?.totalPages && (
          <Button
            className="admin-primary-btn mx-auto d-block mt-20 fs-14"
            onClick={handlePagination}
          >
            Load More
          </Button>
        )}
      </div>
    </div>
  );
};

export default Blog;
