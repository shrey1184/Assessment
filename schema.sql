-- Room Finder Database Schema
-- Run this in Supabase SQL Editor

-- Create rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  location text NOT NULL,
  rent integer NOT NULL,
  property_type text NOT NULL,
  tenant_preference text NOT NULL,
  contact_number text NOT NULL,
  images text[],
  owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view rooms" ON rooms;
DROP POLICY IF EXISTS "Users can insert their own rooms" ON rooms;
DROP POLICY IF EXISTS "Users can update their own rooms" ON rooms;
DROP POLICY IF EXISTS "Users can delete their own rooms" ON rooms;

-- Create policies
CREATE POLICY "Anyone can view rooms" ON rooms
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own rooms" ON rooms
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own rooms" ON rooms
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own rooms" ON rooms
  FOR DELETE USING (auth.uid() = owner_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_rooms_owner_id ON rooms(owner_id);
CREATE INDEX IF NOT EXISTS idx_rooms_created_at ON rooms(created_at DESC);
