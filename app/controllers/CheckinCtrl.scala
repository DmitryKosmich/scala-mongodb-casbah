package controllers

import play.api.mvc.{Action, Controller}
import com.mongodb.casbah.Imports._
import models.Checkin


object CheckinCtrl extends Controller {

  def getAll(page: Int, limit: Int) = Action {
    Ok(views.html.checkins(Checkin.all(page, limit)))
  }
  def search(id: String, page: Int, limit: Int) = Action {
    Ok(views.html.checkins(Checkin.search(MongoDBObject("FQUserId" -> id), page, limit)))
  }
}
