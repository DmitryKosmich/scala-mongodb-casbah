package controllers

import play.api.mvc.{Action, Controller}
import com.mongodb.casbah.Imports._
import models.{Page, Album}


object AlbumCtrl extends Controller {

  def getAll(page: Int, limit: Int) = Action {
    Ok(views.html.albums(Album.all(page, limit), Page(page, 1000, 10)))
  }

  def search(id: String, page: Int, limit: Int) = Action {
    Ok(views.html.albums(Album.search(MongoDBObject("FQUserId" -> id), page, limit), Page(page, 1000, 10)))
  }


}
