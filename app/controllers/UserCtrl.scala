package controllers

import play.api.mvc.{Action, Controller}
import com.mongodb.casbah.Imports._
import models.{Checkin, Album, User}


object UserCtrl extends Controller {

  def getOne(id: String) = Action {
    Ok(views.html.user(User.get(id), getFriends(id, 1, 5), Album.search(MongoDBObject("FQUserId" -> id), 1, 5), Checkin.search(MongoDBObject("FQUserId" -> id), 1, 5)))
  }

  def search(id: String, page: Int, limit: Int ) = Action {
    Ok(views.html.users(getFriends(id, page, limit)))
  }

  def getAll(page: Int, limit: Int) = Action {
    Ok(views.html.users(User.all(page, limit)))
  }

  def getFriends(id: String, page: Int, limit: Int): List[User] = {
    var result: List[User] = Nil
    val user = User.get(id)
    if(user != null) {
      val friends: Array[String] =  user.friends
      for(i <- 0 until friends.length) {
        if(User.get(friends(i)) != null){
          result =  result ++ List(User.get(friends(i)))
        }
      }
    }

    val lastRecord:Int = (page-1)*limit+limit
    result.dropRight(result.length-lastRecord).drop((page-1)*limit)
  }

}
