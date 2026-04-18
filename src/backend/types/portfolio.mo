module {
  public type Project = {
    id : Text;
    title : Text;
    category : Text;
    year : Nat;
    tags : [Text];
    description : Text;
    fullDescription : Text;
    imageUrl : Text;
    awardsCount : Nat;
  };
};
