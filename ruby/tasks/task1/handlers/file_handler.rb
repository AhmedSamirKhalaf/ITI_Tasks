require_relative 'base_handler'

class FileHandler < BaseHandler
  def execute(event)
    file = File.open("log.txt", "a")
    file.puts("#{event.time} | #{event.type} | #{event.description} | #{event.duration}")
    file.close
  end
end
