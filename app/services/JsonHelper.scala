package services

import models._
import com.mongodb.casbah.Imports.DBObject
import play.api.libs.json.{JsArray, JsValue, Json}
import scala.collection.mutable.ArrayBuffer

object JsonHelper {

  def getString(json: JsValue): String = {
    val stringObj = Json.stringify(json);
    val arr: Array[String] = stringObj.split("\"")
    arr.mkString("")
  }

  def toAlbum(doc: DBObject): Album = {
    val json = Json.parse(""+doc)
    Album(
      getString(json\"FQUserId"),
      getString(json\"name"),
      getString(json\"userPicasaId"),
      getString(json\"albumPicasaId"),
      getString(json\"previewSrc"),
      getString(json\"cc"),
      getString(json\"city"),
      getString(json\"created"\"$date")
    )
  }

  def toUser(doc: DBObject): User = {
    val json = Json.parse(""+doc)
    val friends = new Array[String]((json\"friends").toString().split(",").length)
    for(i <- 0 until friends.length) friends(i) =  getString((json\"friends")(i))
    User(
      getString(json\"name"),
      getString(json\"surname"),
      getString(json\"homeCity"),
      getString(json\"avatarSrc"),
      getString(json\"email"),
      getString(json\"FQUserId"),
      friends,
      getString(json\"lastUpdate"),
      getString(json\"points")
    )
  }

  def toCountry(doc: DBObject): Country = {
    val json = Json.parse(""+doc)
    Country(
      getString(json\"cc"),
      getString(json\"name"),
      getString(json\"capital"),
      getString(json\"region"),
      getString(json\"subregion"),
      getString(json\"population"),
      getString(json\"area"),
      getString(json\"gini") ,
      getString(json\"flagSrc")
    )
  }

  def toCheckin(doc: DBObject): Checkin = {
    val json = Json.parse(""+doc)
    Checkin(
      getString(json\"name"),
      getString(json\"address"),
      getString(json\"city"),
      getString(json\"cc"),
      getString(json\"FQUserId"),
      getString(json\"FQCheckinId"),
      getString(json\"lat"),
      getString(json\"lng"),
      getString(json\"isFQ"),
      getString(json\"created")
    )
  }

  def toMessage(doc: DBObject): Message = {
    val json = Json.parse(""+doc)
    Message(
      getString(json\"chatId"),
      getString(json\"body"),
      getString(json\"author"),
      getString(json\"created")
    )
  }

  def toChat(doc: DBObject): Chat = {
    val json = Json.parse(""+doc)
    Chat(
      getString(json\"name"),
      getString(json\"from"),
      getString(json\"to"),
      getString(json\"created")
    )
  }

}