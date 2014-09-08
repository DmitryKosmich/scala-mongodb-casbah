package models

import play.api.libs.json._
import com.mongodb.casbah.Imports._
import services.{DataBase, JsonHelper}

case class Chat(
                 name: String,
                 from: String,
                 to: String,
                 created: String
                 )

object Chat {

  val collection = DataBase.getCollection("chats")

  def search(obj: MongoDBObject, page: Int, limit: Int): List[Chat] = {
    var list: List[Chat] = Nil
    val chats = DataBase.setSelectors(collection.find(obj), (page-1)*limit+limit)
    for(doc <- chats) list = list ++ List(JsonHelper.toChat(doc))
    list.drop((page-1)*limit)
  }

  def all(page: Int, limit: Int): List[Chat] = {
    var list: List[Chat] = Nil
    val allChats = DataBase.setSelectors(collection.find(), (page-1)*limit+limit)
    for(doc <- allChats) list = list ++ List(JsonHelper.toChat(doc))
    list.drop((page-1)*limit)
  }

}