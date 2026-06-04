require_relative 'base_handler'

class ConsoleHandler < BaseHandler
  def execute(event)
    puts "--- EVENT ---"
    puts "Time: #{event.time}"
    puts "Type: #{event.type}"
    puts "Note: #{event.description}"
    puts "Mins: #{event.duration}"
  end
end
