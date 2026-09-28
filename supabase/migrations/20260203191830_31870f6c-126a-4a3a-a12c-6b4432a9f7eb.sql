-- Supprimer l'ancienne table et le schéma marketing
DROP TABLE IF EXISTS marketing.waiting_list;
DROP SCHEMA IF EXISTS marketing;

-- Créer la table waiting_list dans le schéma public
CREATE TABLE public.waiting_list (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  source TEXT
);

-- Activer RLS
ALTER TABLE public.waiting_list ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion publique (visiteurs anonymes)
CREATE POLICY "Allow public insert on waiting_list"
ON public.waiting_list
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Politique pour permettre la lecture aux utilisateurs authentifiés uniquement
CREATE POLICY "Allow authenticated read on waiting_list"
ON public.waiting_list
FOR SELECT
TO authenticated
USING (true);