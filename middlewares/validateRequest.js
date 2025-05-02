exports.validateFields = (fields = []) => {
    return (req, res, next) => {
      const missing = fields.filter(field => !req.body[field]);
      if (missing.length > 0) {
        return res.status(400).json({
          message: `Missing required fields: ${missing.join(', ')}`
        });
      }
      next();
    };
  };
  