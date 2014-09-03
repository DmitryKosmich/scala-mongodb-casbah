package controllers

import play.api.mvc.{Action, Controller}
import com.mongodb.casbah.Imports._
import models.{Album, User}


object UserCtrl extends Controller {

  def getOne(id: String) = Action {
    Ok(views.html.user(User.get(id), getFriends(id), Album.search(MongoDBObject("FQUserId" -> id), 5)))
  }

  def friends(id: String) = Action {
    Ok(views.html.users(getFriends(id)))
  }

  def getAll = Action {
    Ok(views.html.users(User.all()))
  }

  def getFriends(id: String): List[User] = {
    var result: List[User] = Nil
    val friends: Array[String] =  User.get(id).friends
    for(i <- 0 until friends.length) result =  result ++ List(User.get(friends(i)))
    result
  }

}
