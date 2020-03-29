// eslint-disable-next-line import/no-self-import
import 'express';

declare module 'express' {
  interface Request {
    auth?: {
      userId: number;
    };
    file: File;
    // file?: {
    //   key?: string;
    // };
  }
  interface File {
    /** Name of the form field associated with this file. */
    fieldname: string;
    key?: string;
    /** Name of the file on the uploader's computer. */
    originalname: string;
    /**
     * Value of the `Content-Transfer-Encoding` header for this file.
     * @deprecated since July 2015
     * @see RFC 7578, Section 4.7
     */
    encoding: string;
    /** Value of the `Content-Type` header for this file. */
    mimetype: string;
    /** Size of the file in bytes. */
    size: number;
    /** `DiskStorage` Directory to which this file has been uploaded. */
    destination: string;
    /** `DiskStorage` Name of this file within `destination`. */
    filename: string;
    /** `DiskStorage` Full path to the uploaded file. */
    path: string;
    /** `MemoryStorage` A Buffer containing the entire file. */
    buffer: Buffer;
  }
  // namespace Express {
  //   namespace Multer {
  //     interface File {
  //       key?: string;
  //     }
  //   }
  // }
}
