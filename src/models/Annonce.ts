export interface Conduite {
    idconduite: number;
    nomconduite: string;
  }
  
export interface Drivetype {
    iddrivetype: number;
    nomdrivetype: string;
  }
  
export interface Energie {
    idenergie: number;
    nomenergie: string;
  }

export interface Categorie {
    idcategorie: number;
    nomcategorie: string;
}

export interface Carrosserie {
    idcarrosserie: number;
    nomcarrosserie: string;
}

export interface Continent {
    idcontinent: number;
    nomcontinent: string;
}

export interface Marque {
    idmarque: number;
    nommarque: string;
    continent: Continent;
    photo: string;
}
  
export interface Modele {
    idmodele: number;
    nommodele: string;
    poids: number;
    longueur: number;
    largeur: number;
    hauteur: number;
    reservoire: number;
    carrosserie: Carrosserie;
    categorie: Categorie;
    marque: Marque;
  }
  
export interface Transmission {
    idtransmission: number;
    nomtransmission: string;
  }
  
export interface Voiture {
    idvoiture: number;
    nbplace: number;
    nbporte: number;
    kilometrage: number;
    cylindre: number;
    puissance: number;
    fumeur: number;
    datesortie: string;
    conduite: Conduite;
    modele: Modele;
    drivetype: Drivetype;
    transmission: Transmission;
    energie: Energie;
    idoptions: number[];
    photos: string[];
}
  
export interface Annonce {
    idannonce: number;
    descri: string;
    prix: number;
    datepub: string;
    voiture: Voiture;
    idutilisateur: string;
}

export interface Validation {
    idvalidation: number;
    etat:  number;
    annonce: Annonce;
}

export interface Type {
  idtype: number;
  nomtype:  string;
}

export interface Options {
  idoptions: number;
  nomoptions:  string;
  type: TouchType;
}