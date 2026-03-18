//next-ben elkapott hibát itt deklaráljuk hogy mi történjen

export const notFound = (req, res) => {
  res.status(404).json({ message: "Route not found" }); //olyan route beirásánál ami nincs megadva
};

export const errorHandler = (err, req, res, next) => {
  //központi hibakezelő
  if (err?.name === "CastError" && err?.kind === "ObjectId") {
    res.status(400).json({ message: "Invalid ID format" });
  }

  if (err?.code === 11000) {
    const fields = Object.keys(err.keyValue || {});
    return res.status(409).json({ message: "Duplicate value", fields });
  }

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res
      .status(400)
      .json({ message: "Validation failed", errors: messages });
  }

  const status = err?.statusCode || 500;
  res.status(status).json({ message: err?.message || "Internal server error" });
};
