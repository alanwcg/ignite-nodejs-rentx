import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';

import createConnection from '..';

async function create() {
  const connection = await createConnection('localhost');

  const id = uuid();
  const password = await hash('admin', 8);

  await connection.query(
    `INSERT INTO users(id, name, email, password, is_admin, driver_license)
      values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'XXX-9999')
    `,
  );

  await connection.close();
}

create().then(() => console.log('Admin user created'));
