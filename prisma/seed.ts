import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos de Clínica Dental Dra. Bianca...');

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@drabianca.daniautoma.cloud';
  const adminPassword = process.env.ADMIN_PASSWORD || 'AdminDental2025!';

  // 1. Configuración de la Clínica
  await prisma.clinicConfig.upsert({
    where: { id: 'clinic_default' },
    create: {
      id: 'clinic_default',
      clinicName: 'Clínica Dental Dra. Bianca',
      clinicAddress: 'San Salvador, El Salvador • Odontología Especializada & Estética Dental',
      clinicPhone: '+50370000000',
      parkingInfo: 'Estacionamiento privado disponible para pacientes en las instalaciones de la clínica.',
      holidaysJson: JSON.stringify(['2025-01-01', '2025-05-01', '2025-08-05', '2025-08-06', '2025-09-15', '2025-11-02', '2025-12-25']),
      aiModel: 'google/gemini-2.5-flash',
      aiTemperature: 0.2,
      aiBufferSeconds: 8,
      aiSystemPrompt: `Eres Sofía, la asistente virtual de la Clínica Dental Dra. Bianca. Tu objetivo es saludar al paciente, ofrecer información sobre nuestros servicios odontológicos, responder dudas frecuentes sobre tratamientos o dolor, y agendar una cita de valoración en nuestro calendario. Mantén un tono cálido y profesional.`,
      aiIsGloballyActive: true,
      whatsappSessionStatus: 'DISCONNECTED',
    },
    update: {
      clinicName: 'Clínica Dental Dra. Bianca',
      clinicAddress: 'San Salvador, El Salvador • Odontología Especializada & Estética Dental',
      clinicPhone: '+50370000000',
      parkingInfo: 'Estacionamiento privado disponible para pacientes en las instalaciones de la clínica.',
      aiSystemPrompt: `Eres Sofía, la asistente virtual de la Clínica Dental Dra. Bianca. Tu objetivo es saludar al paciente, ofrecer información sobre nuestros servicios odontológicos, responder dudas frecuentes sobre tratamientos o dolor, y agendar una cita de valoración en nuestro calendario. Mantén un tono cálido y profesional.`,
    },
  });
  console.log('✅ Configuración de la clínica guardada.');

  // 2. Administrador General
  const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);
  await prisma.user.upsert({
    where: { email: adminEmail },
    create: {
      name: 'Admin Clínica Dental',
      email: adminEmail,
      passwordHash: hashedAdminPassword,
      role: 'ADMIN',
      isActive: true,
      phone: '+50370000001',
    },
    update: {
      name: 'Admin Clínica Dental',
      passwordHash: hashedAdminPassword,
      role: 'ADMIN',
      isActive: true,
    },
  });
  console.log(`✅ Usuario Administrador configurado: ${adminEmail}`);

  // 3. Recepción y Asistente de Citas
  const opsEmail = 'recepcion@drabianca.daniautoma.cloud';
  const hashedOpsPassword = await bcrypt.hash('Recepcion2025!', 10);
  await prisma.user.upsert({
    where: { email: opsEmail },
    create: {
      name: 'Recepción y Citas',
      email: opsEmail,
      passwordHash: hashedOpsPassword,
      role: 'RECEPTIONIST',
      isActive: true,
      phone: '+50370000002',
    },
    update: {
      name: 'Recepción y Citas',
      role: 'RECEPTIONIST',
      isActive: true,
    },
  });
  console.log(`✅ Recepción configurada: ${opsEmail}`);

  // 4. Odontóloga Principal (Dra. Bianca)
  const dentistEmail = 'dra.bianca@drabianca.daniautoma.cloud';
  const hashedDentistPassword = await bcrypt.hash('DraBianca2025!', 10);
  const dentistUser = await prisma.user.upsert({
    where: { email: dentistEmail },
    create: {
      name: 'Dra. Bianca (Especialista Dental)',
      email: dentistEmail,
      passwordHash: hashedDentistPassword,
      role: 'DENTIST',
      isActive: true,
      phone: '+50370000003',
    },
    update: {
      name: 'Dra. Bianca (Especialista Dental)',
      role: 'DENTIST',
      isActive: true,
    },
  });
  console.log(`✅ Odontóloga Principal configurada: ${dentistEmail}`);

  // Perfil Profesional / Horarios de la Dra. Bianca
  const professional = await prisma.professional.upsert({
    where: { userId: dentistUser.id },
    create: {
      userId: dentistUser.id,
      specialty: 'Odontología Especializada & Estética Dental',
      activeDays: '1,2,3,4,5', // Lunes a Viernes
      startHour: '08:00',
      endHour: '18:00',
      lunchStart: '12:00',
      lunchEnd: '13:00',
      slotIntervalMin: 30,
    },
    update: {
      specialty: 'Odontología Especializada & Estética Dental',
      activeDays: '1,2,3,4,5',
      startHour: '08:00',
      endHour: '18:00',
      lunchStart: '12:00',
      lunchEnd: '13:00',
      slotIntervalMin: 30,
    },
  });
  console.log('✅ Perfil y disponibilidad de la Dra. Bianca guardados (L-V 08:00-18:00).');

  // 5. Catálogo de Servicios Dentales
  const defaultServices = [
    {
      name: 'Valoración Odontológica Inicial',
      category: 'Diagnóstico',
      description: 'Examen general y diagnóstico de salud bucal.',
      durationMinutes: 30,
      price: 25.0,
      isPriceVariable: false,
    },
    {
      name: 'Limpieza Dental Ultrasónica & Pulido',
      category: 'Higiene',
      description: 'Eliminación de sarro y placa con ultrasonido y pulido coronario.',
      durationMinutes: 45,
      price: 45.0,
      isPriceVariable: false,
    },
    {
      name: 'Blanqueamiento Dental LED',
      category: 'Estética',
      description: 'Tratamiento estético de aclarado dental con luz fría LED.',
      durationMinutes: 60,
      price: 120.0,
      isPriceVariable: false,
    },
    {
      name: 'Consulta de Ortodoncia / Brackets',
      category: 'Ortodoncia',
      description: 'Evaluación y plan de tratamiento para alineación dental.',
      durationMinutes: 30,
      price: 30.0,
      isPriceVariable: false,
    },
  ];

  const createdServices: Record<string, string> = {};

  for (const s of defaultServices) {
    const existing = await prisma.service.findFirst({ where: { name: s.name } });
    let serviceId = existing?.id;
    if (!existing) {
      const created = await prisma.service.create({ data: s });
      serviceId = created.id;
      console.log(`✅ Servicio creado: ${s.name} ($${s.price})`);
    } else {
      await prisma.service.update({
        where: { id: existing.id },
        data: s,
      });
      console.log(`ℹ️ Servicio actualizado: ${s.name}`);
    }

    if (serviceId) {
      createdServices[s.name] = serviceId;
      await prisma.professionalService.upsert({
        where: {
          professionalId_serviceId: {
            professionalId: professional.id,
            serviceId: serviceId,
          },
        },
        create: {
          professionalId: professional.id,
          serviceId: serviceId,
        },
        update: {},
      });
    }
  }

  // 6. Pacientes de demostración
  const patient1 = await prisma.patient.upsert({
    where: { phoneNormalized: '+50378901234' },
    create: {
      fullName: 'Andrea Mendoza',
      phoneNormalized: '+50378901234',
      email: 'andrea.mendoza@email.com',
      tags: 'Nuevo,Blanqueamiento',
      generalNotes: 'Interesada en blanqueamiento dental LED para evento próximo.',
      reminderPreference: 'WHATSAPP',
    },
    update: {
      fullName: 'Andrea Mendoza',
      tags: 'Nuevo,Blanqueamiento',
      generalNotes: 'Interesada en blanqueamiento dental LED para evento próximo.',
    },
  });

  const patient2 = await prisma.patient.upsert({
    where: { phoneNormalized: '+50371234567' },
    create: {
      fullName: 'Roberto Gómez',
      phoneNormalized: '+50371234567',
      email: 'roberto.gomez@email.com',
      tags: 'Control,Limpieza',
      generalNotes: 'Limpieza ultrasónica periódica y revisión preventiva.',
      reminderPreference: 'WHATSAPP',
    },
    update: {
      fullName: 'Roberto Gómez',
      tags: 'Control,Limpieza',
      generalNotes: 'Limpieza ultrasónica periódica y revisión preventiva.',
    },
  });

  const patient3 = await prisma.patient.upsert({
    where: { phoneNormalized: '+50372345678' },
    create: {
      fullName: 'Valeria Castillo',
      phoneNormalized: '+50372345678',
      email: 'valeria.castillo@email.com',
      tags: 'Ortodoncia,Evaluación',
      generalNotes: 'Consulta de valoración para inicio de tratamiento de ortodoncia con brackets.',
      reminderPreference: 'WHATSAPP',
    },
    update: {
      fullName: 'Valeria Castillo',
      tags: 'Ortodoncia,Evaluación',
      generalNotes: 'Consulta de valoración para inicio de tratamiento de ortodoncia con brackets.',
    },
  });

  // 7. Citas de demostración en el calendario
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(9, 0, 0, 0);

  const tomorrowEnd = new Date(tomorrow);
  tomorrowEnd.setMinutes(tomorrowEnd.getMinutes() + 60);

  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);
  dayAfter.setHours(10, 0, 0, 0);

  const dayAfterEnd = new Date(dayAfter);
  dayAfterEnd.setMinutes(dayAfterEnd.getMinutes() + 45);

  const existingAppt1 = await prisma.appointment.findFirst({
    where: { patientId: patient1.id },
  });

  if (!existingAppt1 && createdServices['Blanqueamiento Dental LED']) {
    await prisma.appointment.create({
      data: {
        patientId: patient1.id,
        professionalId: dentistUser.id,
        serviceId: createdServices['Blanqueamiento Dental LED'],
        startTime: tomorrow,
        endTime: tomorrowEnd,
        status: 'CONFIRMED',
        origin: 'WHATSAPP_AI',
        adminNotes: 'Cita agendada vía WhatsApp con asistente Sofía.',
      },
    });
    console.log('✅ Cita de prueba 1 creada para Andrea Mendoza.');
  }

  const existingAppt2 = await prisma.appointment.findFirst({
    where: { patientId: patient2.id },
  });

  if (!existingAppt2 && createdServices['Limpieza Dental Ultrasónica & Pulido']) {
    await prisma.appointment.create({
      data: {
        patientId: patient2.id,
        professionalId: dentistUser.id,
        serviceId: createdServices['Limpieza Dental Ultrasónica & Pulido'],
        startTime: dayAfter,
        endTime: dayAfterEnd,
        status: 'CONFIRMED',
        origin: 'RECEPTION',
        adminNotes: 'Control semestral de higiene dental.',
      },
    });
    console.log('✅ Cita de prueba 2 creada para Roberto Gómez.');
  }

  // 8. Conversación de ejemplo en bandeja de WhatsApp
  const conv1 = await prisma.conversation.upsert({
    where: { whatsappJid: '50378901234@s.whatsapp.net' },
    create: {
      patientId: patient1.id,
      whatsappJid: '50378901234@s.whatsapp.net',
      status: 'OPEN',
      isAiActive: true,
    },
    update: {
      status: 'OPEN',
      isAiActive: true,
    },
  });

  const existingMsgCount = await prisma.message.count({
    where: { conversationId: conv1.id },
  });

  if (existingMsgCount === 0) {
    await prisma.message.create({
      data: {
        conversationId: conv1.id,
        senderType: 'PATIENT',
        senderName: 'Andrea Mendoza',
        text: '¡Hola! Quisiera saber el precio y duración del blanqueamiento dental LED y qué días tienen disponible.',
        status: 'RECEIVED',
      },
    });

    await prisma.message.create({
      data: {
        conversationId: conv1.id,
        senderType: 'AI',
        senderName: 'Sofía (Dra. Bianca)',
        text: '¡Hola Andrea! 😊 Con gusto. Nuestro tratamiento de **Blanqueamiento Dental LED** tiene un valor de $120 USD y una duración aproximada de 60 minutos con resultados inmediatos ✨. Contamos con citas disponibles con la Dra. Bianca de lunes a viernes entre 08:00 AM y 06:00 PM. ¿Te gustaría agendar una cita para esta semana?',
        status: 'DELIVERED',
      },
    });
  }

  console.log('🚀 Seed de Clínica Dental Dra. Bianca completado exitosamente.');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
