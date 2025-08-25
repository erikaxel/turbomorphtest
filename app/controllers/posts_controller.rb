class PostsController < ApplicationController
  before_action :set_post, only: %i[ show edit update destroy ]

  # GET /posts or /posts.json
  def index
    @posts = Post.all
  end

  # GET /posts/1 or /posts/1.json
  def show
  end

  # GET /posts/new
  def new
    @post = Post.new
  end

  # GET /posts/1/edit
  def edit
    @turbo_action = params['turbo_action'] || params['post']['turbo_action']

    @post.update(post_params) if params['post']


    # For non-morph the Modal.show method will be called in the connect method in modal_controller.ts
    # This will add another backdrop layer, so we need to manually remove that.
    # For morhp methods, it will only be called the first time we insert the HTML.
    respond_to do |format|
      format.turbo_stream do
        case @turbo_action
        in 'replace'
          # replace replaces the whole #element modal, so we wrap edit in a <div id="modals"> to ensure we keep the element
          render turbo_stream: [
            turbo_stream.action(:remove_backdrop, 'body'),
            turbo_stream.replace("modals",
                                 "<div id=\"modals\">#{render_to_string template: 'posts/edit'}</div>")
          ]
        in 'replace_morph'
          render turbo_stream: [
            turbo_stream.replace("modals",
                                 "<div id=\"modals\">#{render_to_string template: 'posts/edit'}</div>",
                                 method: :morph)

          # Instead of calling open_modal we just set the `class: show` and `display: block` directly in the modal
          # template.
          # turbo_stream.action(:open_modal, "edit-modal")
          ]
        in 'update'
          render turbo_stream: [
            # Removing the backdrop can also be done in the modal connect method
            turbo_stream.action(:remove_backdrop, 'body'),
            turbo_stream.update("modals", template: "posts/edit")
          ]
        in 'update_morph'
          render turbo_stream: [
            turbo_stream.update("modals", template: "posts/edit", method: :morph),
            # turbo_stream.action(:open_modal, "edit-modal")
          ]
        in 'update_inner_modal'
          render turbo_stream: turbo_stream.update("edit-modal", partial: "posts/edit_inner_modal")
        in 'update_inner_modal_morph'
          render turbo_stream: turbo_stream.update("edit-modal", partial: "posts/edit_inner_modal", method: :morph)
        end
      end
      format.html { render :edit }
    end
  end

  # POST /posts or /posts.json
  def create
    # assign the User record we just made for demo purposes
    @post = Post.new(post_params.merge(user: User.first))

    respond_to do |format|
      if @post.save
        format.html { redirect_to @post, notice: "Post was successfully created." }
        format.json { render :show, status: :created, location: @post }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /posts/1 or /posts/1.json
  def update
    respond_to do |format|
      if @post.update(post_params)
        format.html { redirect_to @post, notice: "Post was successfully updated.", status: :see_other }
        format.json { render :show, status: :ok, location: @post }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /posts/1 or /posts/1.json
  def destroy
    @post.destroy!

    respond_to do |format|
      format.html { redirect_to posts_path, notice: "Post was successfully destroyed.", status: :see_other }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_post
    @post = Post.find(params.expect(:id))
  end

  # Only allow a list of trusted parameters through.
  def post_params
    params.expect(post: [:title, :content, :available_on, :user_id])
  end
end
