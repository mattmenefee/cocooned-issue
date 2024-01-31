class Country < ApplicationRecord
  has_many :cities, dependent: :destroy, inverse_of: :country

  accepts_nested_attributes_for :cities, reject_if: :all_blank, allow_destroy: true

  def self.permitted_params
    [:name, { cities_attributes: City.permitted_params }]
  end
end
