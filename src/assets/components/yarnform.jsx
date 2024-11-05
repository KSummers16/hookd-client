import React from "react"

export const YarnForm = ({
  request,
  handleChange,
  handleSubmit,
  weights,
  baseColors,
  companies,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Company:
        <select
          value={request.company_id}
          onChange={(e) => handleChange("company_id", e.target.value)}
        >
          <option value="">Select Company</option>
          {companies.map((company) => {
            ;<option key={company.id} value={company.id}>
              {company.name}
            </option>
          })}
        </select>
      </label>
      <label>
        Name:
        <input
          type="text"
          value={request.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="What is the name?"
          required
        />
      </label>
      <label>
        Weight:
        <select
          value={request.weight_id}
          onChange={(e) => handleChange("weight_id", e.target.value)}
        >
          <option value="">Select Weight</option>
          {weights.map((weight) => (
            <option key={weight.id} value={weight.id}>
              {weight.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Base Color:
        <select
          value={request.base_color_id}
          onChange={(e) => handleChange("base_color_id", e.target.value)}
        >
          <option value="">Select Base Color</option>
          {baseColors.map((base) => (
            <option key={base.id} value={base.id}>
              {base.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Amount:
        <input
          type="number"
          value={request.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          placeholder="Enter amount"
          required
        />
      </label>
      <button type="submit">Add Yarn</button>
    </form>
  )
}
