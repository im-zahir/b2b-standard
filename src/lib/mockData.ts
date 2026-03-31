export interface Product {
  id: string;
  name: string;
  category: "textile" | "pigment" | "rubber" | "specialty";
  description: string;
  specs: { [key: string]: string };
  image: string;
}

export const mockProducts: Product[] = [
  {
    id: "tx-101",
    name: "HydroSoft-900 Ultra",
    category: "textile",
    description: "Premium hydrophilic softener for cotton and blended fabrics, providing exceptional hand-feel.",
    specs: {
      "Appearance": "Translucent Liquid",
      "pH Value": "5.5 - 6.5",
      "Solubility": "Miscible in water",
      "Application": "Exhaust & Padding"
    },
    image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "pg-502",
    name: "TexPrint Blue SB",
    category: "pigment",
    description: "High-concentration pigment blue paste for textile screen printing with excellent fastness.",
    specs: {
      "Pigment Content": "35%",
      "Viscosity": "80-120 mPa.s",
      "Light Fastness": "7-8/8",
      "Washing Fastness": "4-5/5"
    },
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "rb-204",
    name: "ElasticWhite Pro",
    category: "rubber",
    description: "Super-elastic white rubber paste for high-stretch sportswear and lycra fabrics.",
    specs: {
      "Stretching": ">400%",
      "Opacity": "95%",
      "Curing Temp": "150°C",
      "Pot Life": "12 Hours"
    },
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
  }
];
