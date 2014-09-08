package models

import play.api.libs.json._
import com.mongodb.casbah.Imports._
import services.{DataBase, JsonHelper}

case class Checkin(
                  name: String,
                  address: String,
                  city: String,
                  cc: String,
                  FQUserId: String,
                  FQCheckinId: String,
                  lat: String,
                  lng: String,
                  isFQ: String,
                  created: String
                  )

object Checkin {

  val collection = DataBase.getCollection("checkins")

  def search(obj: MongoDBObject, page: Int, limit: Int): List[Checkin] = {
    var list: List[Checkin] = Nil
    val checkins = DataBase.setSelectors(collection.find(obj), (page-1)*limit+limit)
    for(doc <- checkins) list = list ++ List(JsonHelper.toCheckin(doc))
    list.drop((page-1)*limit)
  }

  def all(page: Int, limit: Int): List[Checkin] = {
    var list: List[Checkin] = Nil
    val allCheckins = DataBase.setSelectors(collection.find(), (page-1)*limit+limit)
    for(doc <- allCheckins) list = list ++ List(JsonHelper.toCheckin(doc))
    list.drop((page-1)*limit)
  }

}