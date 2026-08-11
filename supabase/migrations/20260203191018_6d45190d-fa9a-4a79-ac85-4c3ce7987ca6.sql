-- Création du schéma marketing
CREATE SCHEMA IF NOT EXISTS marketing;

-- Création de la table waiting_list
CREATE TABLE marketing.waiting_list (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  source TEXT
);

-- Enable Row Level Security
ALTER TABLE marketing.waiting_list ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre les insertions publiques (anonymes)
CREATE POLICY "Anyone can insert to waiting list" 
ON marketing.waiting_list 
FOR INSERT 
WITH CHECK (true);

-- Politique pour empêcher la lecture publique (sécurité)
-- Seuls les admins pourront lire via le dashboard Supabase
CREATE POLICY "No public select on waiting list" 
ON marketing.waiting_list 
FOR SELECT 
USING (false);