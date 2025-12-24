// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import fs from "fs";

import sharp from "sharp"; // sharp-import
import path from "path";
import { buildConfig, PayloadRequest } from "payload";
import { fileURLToPath } from "url";

import { Categories } from "./collections/Categories";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Posts } from "./collections/Posts";
import { Users } from "./collections/Users";
import { Products } from "./collections/Products";
import { Customers } from "./collections/Customers";
import { Orders } from "./collections/Orders";
// import { ProductVariants } from './collections/product-variants'
import { Tags } from "./collections/Tags";
import { Header } from "./Header/config";
import { Footer } from "./Footer/config";
import { plugins } from "./plugins";
import { defaultLexical } from "@/fields/defaultLexical";
// import { getServerSideURL } from './utilities/getURL'
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const sslPath = path.join(dirname, "..", "certs", "ssl-key.pem");

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ["@/components/BeforeLogin"],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      // beforeDashboard: ['@/components/BeforeDashboard'],
      // Nav: {
      //   path: "@/components/AdminNavbar#AdminNavbar",
      // },
    },
    autoLogin: {
      email: "guest@gmail.com",
      password: "guest",
      prefillOnly: true,
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: "Mobile",
          name: "mobile",
          width: 375,
          height: 667,
        },
        {
          label: "Tablet",
          name: "tablet",
          width: 768,
          height: 1024,
        },
        {
          label: "Desktop",
          name: "desktop",
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
      ssl:
        process.env.APP_ENV === "production"
          ? {
              rejectUnauthorized: false,
              ca: fs.readFileSync(sslPath).toString(),
            }
          : false,
    },
  }),
  email: nodemailerAdapter({
    defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || "", //"Store" <testonly999999@gmail.com>
    defaultFromName: process.env.EMAIL_FROM_NAME || "",
    transportOptions: {
      host: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
  folders: {
    collectionOverrides: [
      async ({ collection }) => {
        return collection;
      },
    ], // optional
    fieldName: "folder", // optional
    slug: "payload-folders", // optional
  },
  // logger: 'sync',
  collections: [Users, Pages, Posts, Media, Products, Categories, Tags, Customers, Orders],
  // cors: false,
  cors: [],
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  upload: {
    limits: {
      fileSize: 1 * 1024 * 1024, // 1 MB
    },
  },
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
