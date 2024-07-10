class Beer {
  constructor(name, type) {
    this.id = Beer.incrementId();
    this.name = name;
    this.type = type;
    this.ratings = [];
  }

  static incrementId() {
    if (!this.latestId) this.latestId = 1;
    else this.latestId++;
    return this.latestId;
  }
}

module.exports = Beer;
