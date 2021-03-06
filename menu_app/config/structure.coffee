# Read more about app structure at http://docs.appgyver.com

module.exports =

  # See styling options for tabs and other native components in app/common/native-styles/ios.css or app/common/native-styles/android.css

  rootView:
    location: "orderList#index"

  tabs: [
    {
      title: "List"
      id: "orderList"
      location: "orderList#index"
    },
    {
      title: "Place"
      id: "placeOrder"
      location: "placeOrder#index"
    }
  ]
  
    

  # drawers:
  #   left:
  #     id: "leftDrawer"
  #     location: "example#drawer"
  #     showOnAppLoad: false
  #   options:
  #     animation: "swingingDoor"
  #
  # initialView:
  #   id: "initialView"
  #   location: "example#initial-view"
