require_relative 'life_event'
require_relative 'event_router'
require_relative 'handlers/console_handler'
require_relative 'handlers/file_handler'
require_relative 'handlers/sqlite_handler'

class LifeTrack
  def initialize
    @router = EventRouter.new
    @router.add_output(ConsoleHandler.new)
    @router.add_output(FileHandler.new)
    @router.add_output(SQLiteHandler.new)
  end

  def start
    puts "Welcome to LifeTrack"
    
    loop do
      puts "\n1. Work"
      puts "2. Study"
      puts "3. Exercise"
      puts "4. Meal"
      puts "5. Exit"
      print "Choose: "
      
      choice = gets.chomp
      
      if choice == "5"
        break
      end

      types = { "1" => "Work", "2" => "Study", "3" => "Exercise", "4" => "Meal" }
      name = types[choice]

      if name == nil
        puts "Invalid choice"
      else
        print "Description: "
        desc = gets.chomp
        print "Minutes: "
        mins = gets.chomp.to_i

        event = LifeEvent.new(name, desc, mins)
        @router.send_event(event)
        puts "Done!"
      end
    end
  end
end

app = LifeTrack.new
app.start
