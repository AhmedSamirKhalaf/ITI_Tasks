require 'sqlite3'
require_relative 'base_handler'

class SQLiteHandler < BaseHandler
  def initialize
    @db = SQLite3::Database.new("data.db")
    @db.execute("CREATE TABLE IF NOT EXISTS events (type TEXT, desc TEXT, mins INTEGER, time TEXT)")
  end

  def execute(event)
    @db.execute("INSERT INTO events VALUES (?, ?, ?, ?)", [event.type, event.description, event.duration, event.time.to_s])
  end
end
