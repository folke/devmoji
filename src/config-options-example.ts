export const defaults = {
  // extra types used in commit messages
  types: ["lint"],
  // custom devmoji
  devmoji: [
    // use :boom: instead of :sparkles: for the type 'feat'
    { code: "feat", emoji: "boom" },
    // add a custom devmoji
    {
      code: "fail",
      emoji: "poop",
      description: "something bad happened",
    },
    // add a new devmoji based on an existing gitmoji. description will be taken from the gitmoji
    {
      code: "css",
      gitmoji: "art",
    },
    // the emoji from the gitmoji can be overriden as well
    {
      code: "config",
      gitmoji: "wrench",
      emoji: "gear",
    },
  ],
}
