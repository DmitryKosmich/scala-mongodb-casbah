package models

import play.api.libs.json._
import com.mongodb.casbah.Imports._
import services.{DataBase, JsonHelper}

case class Message(
                  chatId: String,
                  body: String,
                  author: String,
                  created: String
                  )

object Message {

  val collection = DataBase.getCollection("messages")

  def search(obj: MongoDBObject, page: Int, limit: Int): List[Message] = {
    var list: List[Message] = Nil
    val messages = DataBase.setSelectors(collection.find(obj), (page-1)*limit+limit)
    for(doc <- messages) list = list ++ List(JsonHelper.toMessage(doc))
    list.drop((page-1)*limit)
  }

  def all(page: Int, limit: Int): List[Message] = {
    var list: List[Message] = Nil
    val allMessages = DataBase.setSelectors(collection.find(), (page-1)*limit+limit)
    for(doc <- allMessages) list = list ++ List(JsonHelper.toMessage(doc))
    list.drop((page-1)*limit)
  }

}