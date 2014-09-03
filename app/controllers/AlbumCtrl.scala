package controllers

import play.api.mvc.{Action, Controller}
import models.Album


object AlbumCtrl extends Controller {

  def getAll(begin: Int, limit: Int) = Action {
    Ok(views.html.albums(Album.all(begin, limit)))
  }

}
