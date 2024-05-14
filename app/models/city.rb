class City < ApplicationRecord
  belongs_to :country
  has_many :buildings, dependent: :destroy, inverse_of: :city
  has_rich_text :description

  accepts_nested_attributes_for :buildings, reject_if: :all_blank, allow_destroy: true

  def self.permitted_params
    [:id, :country_id, :name, :description, :_destroy, { buildings_attributes: Building.permitted_params }]
  end
end
