import BlogModel from "./model.js";
import markdownIt from "markdown-it";
import {errorResponse,successResponse} from "../../../helper/apiResponse.js";
import {paginationDetails,paginationFun} from "../../../helper/common.js";
import Services from "../blog/service.js";
import {deleteFile} from "../../../helper/aws_s3.js";
import CommentModel from '../../comment/model.js';
import mongoose from 'mongoose';
import {updateFile,uploadSingleFile} from "../../aws/controller.js";
import slugify from 'slugify';
const folderName = "blog";

class controller {
  /**
   * create
   */
  static create = async (req,res) => {
    try {
      const userId = req.user._id;
      const {title,video,description,html,type} = req.body;

      if (title) {
        const findTitle = await BlogModel.findOne({title: title});
        if (findTitle) {
          return errorResponse({
            res,
            error: Error("This title is already in use by another blog.")
          });
        }
      }

      let url = await uploadSingleFile(req,folderName);
      let htmlContent;

      const md = markdownIt({
        html: true,
        linkify: true,
        typographer: true
      });

      let slug = slugify(title,{lower: true});
      if (html) htmlContent = md.render(html);
      const doc = {title,html: htmlContent,video,url,description,slug,postBy: userId,type};
      const result = await Services.create(doc);

      return successResponse({
        res,
        statusCode: 201,
        data: result,
        message: "Blog created successfully.",
      });
    } catch (error) {
      return errorResponse({res,error});
    }
  };

  /**
   * get
   */
  static get = async (req,res) => {
    try {
      const {id} = req.params;
      const {type,slug} = req.query;

      let filter = {};
      if (id) filter._id = new mongoose.Types.ObjectId(id);
      if (type) filter.type = {$regex: new RegExp(`^${ type }$`,'i')};
      if (slug) filter.slug = {$regex: new RegExp(`^${ slug }$`,'i')};

      const pagination = paginationFun(req.query);
      let count,paginationData;

      count = await BlogModel.countDocuments(filter);
      const result = await Services.get(filter,pagination);

      for (let i = 0;i < result.length;i++) {
        const commentCount = await CommentModel.countDocuments({blog: result[ i ]._id});
        result[ i ].commentCount = commentCount;
      }

      paginationData = paginationDetails({
        limit: pagination.limit,
        page: req.query.page,
        totalItems: count,
      });

      return successResponse({
        res,
        statusCode: 200,
        pagination: paginationData,
        data: result,
        message: "Blog retrieved successfully."
      });
    } catch (error) {
      return errorResponse({res,error});
    }
  };

  /**
   * get details
   */
  static getDetails = async (req,res) => {
    try {
      const {id} = req.params;
      const {title,type,slug} = req.query;

      let filter = {};
      if (id) filter._id = new mongoose.Types.ObjectId(id);
      if (title) filter.title = {$regex: title,$options: "i"};
      if (type) filter.type = {$regex: new RegExp(`^${ type }$`,'i')};
      if (slug) filter.slug = {$regex: new RegExp(`^${ slug }$`,'i')};

      const pagination = paginationFun(req.query);
      let count,paginationData;

      count = await BlogModel.countDocuments(filter);
      const result = await Services.getDetails(filter,pagination);

      paginationData = paginationDetails({
        limit: pagination.limit,
        page: req.query.page,
        totalItems: count,
      });

      return successResponse({
        res,
        statusCode: 200,
        pagination: paginationData,
        data: result,
        message: "Blog retrieved successfully."
      });
    } catch (error) {
      return errorResponse({res,error});
    }
  };

  /**
   * update
   */
  static patch = async (req,res) => {
    try {
      const {id} = req.params;
      const userId = req.user._id;
      const {title,video,description,html} = req.body;

      const findDoc = await BlogModel.findById(id);
      if (!findDoc) {
        return errorResponse({
          res,
          error: Error("Blog not found."),
          statusCode: 404
        });
      }

      const md = markdownIt({
        html: true,
        linkify: true,
        typographer: true
      });

      let slug,htmlContent;
      let newUrl = await updateFile(req,findDoc,folderName);
      if (slug) slugify(title,{lower: true});
      if (html) {htmlContent = md.render(html);}

      const doc = {title,video,description,html: htmlContent,url: newUrl,slug,postBy: userId};
      const result = await Services.patch(id,doc);
      return successResponse({
        res,
        statusCode: 200,
        data: result,
        message: "Blog is updated."
      });
    } catch (error) {
      return errorResponse({res,error});
    }
  };

  /**
   * delete blog
   */
  static deleteBlog = async (req,res) => {
    try {
      const {id} = req.params;
      const existingBlog = await BlogModel.findById(id);
      if (!existingBlog) {
        return errorResponse({
          res,error: Error("Blog not found."),statusCode: 404
        });
      }

      if (existingBlog.url) {
        await deleteFile({
          filename: existingBlog.url,
        });
      }

      await Services.deleteBlog(res,id);
    } catch (error) {
      return errorResponse({res,error});
    }
  };
}
export default controller;
