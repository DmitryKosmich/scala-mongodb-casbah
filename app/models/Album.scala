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

  val albumCollection = DataBase.getCollection("albums")

  def all(begin: Int, limit: Int): List[Album] = {
    var list: List[Album] = Nil
    val allAlbums = setSelectors(albumCollection.find(), limit)
    for(doc <- allAlbums) list = list ++ List(JsonHelper.toAlbum(doc))
    list
  }

  def search(obj: MongoDBObject, limit: Int): List[Album] = {
    var list: List[Album] = Nil
    val albums = setSelectors(albumCollection.find(obj), limit)
    for(doc <- albums) list = list ++ List(JsonHelper.toAlbum(doc))
    list
  }

  def setSelectors(cursor: MongoCursor, limit: Int): MongoCursor = {
    if(limit>0){
      cursor.limit(limit)
    }else{
      cursor
    }
  }

  def create(label: String, who: String, time: String) {}

  def delete(id: Long) {}

}