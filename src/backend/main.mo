import Types "types/portfolio";
import PortfolioLib "lib/portfolio";
import PortfolioMixin "mixins/portfolio-api";
import List "mo:core/List";

actor {
  let projects : List.List<Types.Project> = List.empty();
  PortfolioLib.seed(projects);

  include PortfolioMixin(projects);
};
