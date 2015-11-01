module Api
  class CommentsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
      comments = Comment.all.order(created_at: :desc)
      render json: comments
    end

    def create
      comment = Comment.new(comment_params)
      if comment.save
        render json: comment, status: :created
      else
        render json: comment, status: :unprocessable_entity
      end
    end

    private

    def comment_params
      params.permit(:author, :text)
    end
  end
end
