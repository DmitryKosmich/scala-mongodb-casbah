package models

import play.api.libs.json._
import com.mongodb.casbah.Imports._
import services.{DataBase, JsonHelper}

case class Album(
                  FQUserId: String,
                  name: String,
                  userPicasaId: String,
                  albumPicasaId: String,
                  previewSrc: String,
                  cc: String,
                  city: String,
                  created: String
                  )

object Album {

  val collection = DataBase.getCollection("albums")

  def search(obj: MongoDBObject, page: Int, limit: Int): List[Album] = {
    var list: List[Album] = Nil
    val albums = DataBase.setSelectors(collection.find(obj), (page-1)*limit+limit)
    for(doc <- albums) list = list ++ List(JsonHelper.toAlbum(doc))
    list.drop((page-1)*limit)
  }

  def all(page: Int, limit: Int): List[Album] = {
    var list: List[Album] = Nil
    val allAlbums = DataBase.setSelectors(collection.find(), (page-1)*limit+limit)
    for(doc <- allAlbums) list = list ++ List(JsonHelper.toAlbum(doc))
    list.drop((page-1)*limit)
  }

}