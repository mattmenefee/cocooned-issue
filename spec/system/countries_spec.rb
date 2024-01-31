# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Countries', :js do
  it 'Creating a country' do
    visit root_path
    click_link 'New country'

    within '.country_name' do
      fill_in 'Name', with: 'Country 1'
    end

    click_link 'Add a city'

    within '.country_cities_name' do
      fill_in 'Name', with: 'City 1'
    end

    click_button 'Create Country'

    expect(page).to have_content('Country was successfully created.')

    expect(page).to have_content('Country 1')
    expect(page).to have_content('City 1')

    click_link 'Edit this country'

    within all('.city-item')[0] do
      click_link 'Add a building'

      within '.country_cities_buildings_name' do
        fill_in 'Name', with: 'Building 1A'
      end
    end

    click_link 'Add a city'

    within all('.city-item')[1] do
      within '.country_cities_name' do
        fill_in 'Name', with: 'City 2'
      end

      click_link 'Add a building'

      within '.building-item' do
        fill_in 'Name', with: 'Building 2A'
      end
    end

    click_link 'Add a city'

    within all('.city-item')[2] do
      within '.country_cities_name' do
        fill_in 'Name', with: 'City 3'
      end

      click_link 'Add a building'

      # NOTE: the building partial is correctly located within the "City 3" Cocooned form
      within '.building-item' do
        fill_in 'Name', with: 'Building 3A'
      end
    end

    click_button 'Update Country'

    expect(page).to have_content('Country was successfully updated.')

    within 'li', text: 'City 1' do
      expect(page).to have_content('Building 1A')
    end

    within 'li', text: 'City 2' do
      expect(page).to have_content('Building 2A')
    end

    # NOTE: Building 3A was erroneously associated with City 2 instead of City 3
    within 'li', text: 'City 3' do
      expect(page).to have_content('Building 3A') # this fails
    end
  end
end
