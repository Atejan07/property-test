# Full-stack Technical Task

## Installation

- Run `yarn install` on both the Server folder and Client folder.

## Usage

- Include the following line in the `.env` file in the Server folder with the desired PORT:

```bash
PORT=3001
```

## Cloudinary

To handle pictures upload, I utilised Cloudinary, a cloud-based image and video management.

To get started, please include the following details in your `.env` file located in the Server folder:

```bash
PUBLIC_CLOUDINARY_CLOUD_NAME=example
CLOUDINARY_URL=cloudinary://example:example@example
CLOUDINARY_PRESET=example
CLOUDINARY_API_KEY=example
CLOUDINARY_API_SECRET=example
```

## Getting started

- Run `yarn start` from the Client folder.
- Run `yarn start` from the Server folder.

## Tests

- To run the React components tests, please run `yarn test` in the Client folder.
- To run the Node endpoints tests, please run `yarn test` in the Server folder.

## Decisions

I decided to use _Axios_ for making HTTP requests, ensuring efficient data communication between frontend and backend components. The integration of _UUID_ facilitated unique identifier generation, enhancing data integrity and organisation. _Cloudinary_ and _Multer_ were chosen for their seamless image uploading and storage capabilities, optimising user experience when adding property photos. I also employed _Jest_ and _SuperTest_ to test the application, guaranteeing its reliability and functionality. As for the frontend, opting for _vanilla CSS_ allowed me to create a tailored and lightweight styling solution, aligning with the project's simplicity.

## What would I do next?

If I had 20+ hours to further develop this project I would build:

- User authentication and registration to maintain the security and privacy of user data.
- Edit and delete property functionalities, enhancing the user experience and giving them control over their listings.
- Search bar to quickly find specific properties based on keywords, improving usability within the app.
- Sorting and filtering options for property listings, improving the user experience by displaying properties based on their preferences.
- Address Finder API to auto-suggest addresses as users start typing, reducing input errors and making the property addition process more efficient.
- Feature to save properties in a user's favorites list, enhancing engagement and encouraging users to return to the platform.
- More robust error handling and validation, making the app more stable, secure, and user-friendly.
- Improved UI/UX design, enhancing the user experience.
