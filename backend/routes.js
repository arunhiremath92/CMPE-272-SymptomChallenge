const { checkAuth, auth } = require("../helpers/passport");

const accounts = require("../controllers/accounts.js");
const listings = require("../controllers/listings.js");
const searchListing = require("../controllers/searchListing");
const application = require("../controllers/application");
const userListing = require("../controllers/userListing");

auth();

module.exports = (app) => {

  // Create a new account
  app.post("/users/register", accounts.create);

  // Login an account
  app.post("/users/login", accounts.login);

  // Create listings
  app.post("/listings/create", checkAuth, listings.createListing);
  
  // Fetch listings for users
  app.get("/listings/:listingId", checkAuth, listings.getListingDetails);

  // Fetch all listsings
  app.get("/listings", listings.getAllListings);

  // Search rental listings
  app.get("/search/rentals", searchListing.searchRentalListings);

  // Search sales listings
  app.get("/search/sales", searchListing.searchSalesListings);

  // Create application
  app.post("/users/:accountId/applications", checkAuth, application.createApplication);

  // Get all applications sent by the user
  app.get("/users/:accountId/applications", checkAuth, application.getApplicationsForUser);

  // Get all applications received by the user
  app.get("/users/:accountId/offers", checkAuth, application.getReceivedApplications);

  // Update application
  app.put("/users/:accountId/applications/:applicationId", checkAuth, application.updateApplication);

  // Delete application
  app.delete("/applications/:applicationId", checkAuth, application.deleteApplication);

  // Mark a listing as favorite
  app.put("/users/:accountId/markFavorite", checkAuth, userListing.markFavorite);

  // Unmark a listing favorite
  app.put("/users/:accountId/unmarkFavorite", checkAuth, userListing.unmarkFavorite);

  // Get all favorite listings
  app.get("/users/:accountId/favorites", checkAuth, userListing.getFavorites);

  // Admin fetch all users 
  app.get("/users", checkAuth, accounts.getAllAccounts); 

  // Admin updates users 
  app.post("/users/:accountId", checkAuth, accounts.updateAccounts);

  // Admin approves and rejects users 
  app.post("/users/update_status/:accountId", checkAuth, accounts.updateStatus);

  // Seller/landlord removes the listing after being occupied/bought by renter/buyer
  app.post("/listings/listing_status/:listingId", checkAuth, listings.updateStatus);
  app.delete("/listings/:listingId", checkAuth, listings.deleteListing);

  // User can update its own profile 
  app.post("/profile", checkAuth, accounts.updateProfile);
};
