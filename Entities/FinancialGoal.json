{
  "name": "FinancialGoal",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "description": "Goal title"
    },
    "description": {
      "type": "string",
      "description": "Detailed description of the goal"
    },
    "target_amount": {
      "type": "number",
      "description": "Target amount to save"
    },
    "current_amount": {
      "type": "number",
      "default": 0,
      "description": "Current saved amount"
    },
    "target_date": {
      "type": "string",
      "format": "date",
      "description": "Target completion date"
    },
    "category": {
      "type": "string",
      "enum": [
        "emergency",
        "vacation",
        "investment",
        "purchase",
        "retirement",
        "other"
      ],
      "description": "Goal category"
    },
    "priority": {
      "type": "string",
      "enum": [
        "low",
        "medium",
        "high"
      ],
      "default": "medium",
      "description": "Goal priority"
    },
    "is_achieved": {
      "type": "boolean",
      "default": false,
      "description": "Whether goal has been achieved"
    },
    "monthly_contribution": {
      "type": "number",
      "description": "Suggested monthly contribution"
    }
  },
  "required": [
    "title",
    "target_amount",
    "target_date",
    "category"
  ]
}