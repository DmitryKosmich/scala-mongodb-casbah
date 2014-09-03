package models

import play.api.libs.json._
import com.mongodb.casbah.Imports._
import services.{JsonHelper, DataBase}

case class User(
                  name: String,
                  surname: String,
                  homeCity: String,
                  avatarSrc: String,
                  email: String,
                  FQUserId: String,
                  friends: Array[String],
                  lastUpdate: String,
                  points: String
                  )

object User {

  val collection = DataBase.getCollection("users")

  def get(id: String): User = {
    var result:User = null
    val param = MongoDBObject("FQUserId" -> id)
    val users = collection.findOne( param )
    for(user <- users) result = JsonHelper.toUser(user)
    result
  }

  def search(obj: MongoDBObject): List[User] = {
    var list: List[User] = Nil
    val users = collection.find(obj)
    for(doc <- users) list = list ++ List(JsonHelper.toUser(doc))
    list
  }

  def all(): List[User] = {
    var list: List[User] = Nil
    val allUsers = collection.find()
    for(doc <- allUsers) list = list ++ List(JsonHelper.toUser(doc))
    list
  }

  def create(label: String, who: String, time: String) {}

  def delete(id: Long) {}

}