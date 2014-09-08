package controllers

import play.api.mvc.{Action, Controller}
import models._
import play.api.libs.json.Json
import play.api.Routes
import routes.javascript._

object StatisticsCtrl extends Controller{

  def getAll() = Action {
    Ok(views.html.statistics(User.all(1, 0), Country.all(1, 0), Checkin.all(1, 0), Album.all(1, 0)))
  }

  def getStatistics() = Action {
    Ok(Json.obj(
      "users" -> Json.obj(
        "name" -> "users",
        "total" -> User.all(1, 0).length
      ),

      "countries" -> Json.obj(
        "name" -> "countries",
        "total" -> Country.all(1, 0).length
      ),

      "checkins" -> Json.obj(
        "name" -> "checkins",
        "total" -> Checkin.all(1, 0).length
      ),

      "albums" -> Json.obj(
        "name" -> "albums",
        "total" -> Album.all(1, 0).length
      ),

      "messages" -> Json.obj(
        "name" -> "messages",
        "total" -> Message.all(1, 0).length
      ),

      "chats" -> Json.obj(
        "name" -> "chats",
        "total" -> Chat.all(1, 0).length
      )
    ))
  }
}
