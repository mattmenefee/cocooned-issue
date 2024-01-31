class Building < ApplicationRecord
  belongs_to :city

  def self.permitted_params
    [:id, :city_id, :name, :_destroy]
  end
end
