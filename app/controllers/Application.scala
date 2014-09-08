package controllers

import play.api._
import play.api.mvc._
import models.User

object Application extends Controller {

  def index = Action {
    Redirect(routes.UserCtrl.getAll(1, 10))
  }

}