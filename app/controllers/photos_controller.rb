class PhotosController < ApplicationController
  def index
    respond_to do |format|
      format.html { render :index }
      format.json { render :json => Photo.all }
    end
  end

  def create
    @photo = current_user.photos.new(params[:photo])
    if @photo.save
      render :json => @photo
    else
      render :json => @photo, :status => :unprocessable_entity
    end
  end

  def destroy
    @photo = Photo.find(params[:id])
    if @photo.destroy
      render :json => @photo
    else
      render :json => @photo, :status => :unprocessable_entity
    end
  end

  def edit
    @photo = Photo.find(params[:id])
    if @photo.update_attributes(params[:photo])
      render :json => @photo
    else
      render :json => @photo, :status => :unprocessable_entity
    end
  end

  def show
    @photo = Photo.find(params[:id])
    render :json => @photo
  end
end
