import Types "../types/portfolio";
import PortfolioLib "../lib/portfolio";
import List "mo:core/List";

mixin (projects : List.List<Types.Project>) {
  public query func getProjects() : async [Types.Project] {
    PortfolioLib.getAll(projects);
  };

  public query func getProjectsByCategory(category : Text) : async [Types.Project] {
    PortfolioLib.getByCategory(projects, category);
  };

  public query func getProject(id : Text) : async ?Types.Project {
    PortfolioLib.getById(projects, id);
  };
};
