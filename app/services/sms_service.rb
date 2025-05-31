require 'net/http'
require 'uri'
require 'json'
class SmsService
    
    def send_sms(phone, message)
      uri = URI.parse('https://textbelt.com/text')
      response = Net::HTTP.post_form(uri, {
        'phone' => phone,
        'message' => message,
        'key' => ENV['TEXT_BELT_API_KEY'] 
      })
      JSON.parse(response.body)
    end
end