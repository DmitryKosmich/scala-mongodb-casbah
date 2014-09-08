package controllers

import play.api.mvc.{Action, Controller}
import models.Country


object CountryCtrl extends Controller {

  def getAll(page: Int, limit: Int) = Action {
    Ok(views.html.countries(Country.all(page, limit)))
  }

}
