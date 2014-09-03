package controllers

import play.api._
import play.api.mvc._
import models.Album

object Application extends Controller {

  def index = Action {
    Ok(views.html.albums(Album.all(0, 0)))
  }
  
}