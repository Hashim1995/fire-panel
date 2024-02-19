/* eslint-disable no-unused-vars */
import {
  IHomeStats,
  UsersServies
} from '@/services/user-services/user-services';
import { noText } from '@/utils/constants/texts';
import {
  AbsoluteCenter,
  Box,
  Divider,
  Flex,
  Heading,
  Stat,
  useToast,
  StatGroup,
  StatLabel,
  StatNumber,
  Skeleton
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

function Stats() {
  const [data, setData] = useState<IHomeStats>();
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await UsersServies.getInstance().getHomePagestats();
      if (res?.succeeded) {
        setData(res?.data);
      }
      setLoading(false);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error?.response?.data?.messages?.length) {
          error.response.data.messages?.map((z: string) =>
            toast({
              title: 'Xəta baş verdi',
              description: z,
              status: 'error',
              position: 'top-right',
              duration: 3000,
              isClosable: true
            })
          );
        } else {
          toast({
            title: 'Xəta baş verdi',

            status: 'error',
            position: 'top-right',
            duration: 3000,
            isClosable: true
          });
        }
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {!loading ? (
        <>
          <Box position="relative" mb={1} padding="15">
            <Divider />
            <AbsoluteCenter bg="white" px="2">
              {'Müraciətlər'}
            </AbsoluteCenter>
          </Box>
          <Heading
            fontWeight={400}
            mb={1}
            fontSize={{ base: '1xl', sm: '2xl', md: 'lg' }}
            color="gray.800"
          >
            Viza müraciətlərinə görə (aylıq)
          </Heading>
          <StatGroup mb={5} gap={3}>
            <Stat borderRadius={12} p={2} bg={'blue.100'}>
              <StatLabel fontSize={'xs'}>İcrada</StatLabel>
              <StatNumber fontSize={'md'}>
                {data?.monthlyVisaLevelStatistics?.inProgress ?? noText}
              </StatNumber>
            </Stat>
            <Stat borderRadius={12} p={2} bg={'blue.100'}>
              <StatLabel fontSize={'xs'}>Sənədlərin yüklənməsi</StatLabel>
              <StatNumber fontSize={'md'}>
                {data?.monthlyVisaLevelStatistics?.pendingForDocument ?? noText}
              </StatNumber>
            </Stat>
            <Stat borderRadius={12} p={2} bg={'blue.100'}>
              <StatLabel fontSize={'xs'}>Yoxlama prosesində</StatLabel>
              <StatNumber fontSize={'md'}>
                {data?.monthlyVisaLevelStatistics?.inInspection ?? noText}
              </StatNumber>
            </Stat>
          </StatGroup>
          <StatGroup mb={5} gap={3}>
            <Stat borderRadius={12} p={2} bg={'blue.100'}>
              <StatLabel fontSize={'xs'}>Ləğv Edilmiş</StatLabel>
              <StatNumber fontSize={'md'}>
                {data?.monthlyVisaLevelStatistics?.cancelled ?? noText}
              </StatNumber>
            </Stat>
            <Stat borderRadius={12} p={2} bg={'blue.100'}>
              <StatLabel fontSize={'xs'}>Düzəliş gözləyən</StatLabel>
              <StatNumber fontSize={'md'}>
                {data?.monthlyVisaLevelStatistics?.pendingForDocumentRecovery ??
                  noText}
              </StatNumber>
            </Stat>
            <Stat borderRadius={12} p={2} bg={'blue.100'}>
              <StatLabel fontSize={'xs'}>Təsdiqlənmiş</StatLabel>
              <StatNumber fontSize={'md'}>
                {data?.monthlyVisaLevelStatistics?.documentsConfirmed ?? noText}
              </StatNumber>
            </Stat>
          </StatGroup>
          <Heading
            fontWeight={400}
            mb={1}
            fontSize={{ base: '1xl', sm: '2xl', md: 'lg' }}
            color="gray.800"
          >
            Viza müraciətlərinə görə (illik)
          </Heading>
          <StatGroup mb={5} gap={3}>
            <Stat borderRadius={12} p={2} bg={'blue.100'}>
              <StatLabel fontSize={'xs'}>İcrada</StatLabel>
              <StatNumber fontSize={'md'}>
                {data?.fullVisaLevelStatistics?.inProgress ?? noText}
              </StatNumber>
            </Stat>
            <Stat borderRadius={12} p={2} bg={'blue.100'}>
              <StatLabel fontSize={'xs'}>Sənədlərin yüklənməsi</StatLabel>
              <StatNumber fontSize={'md'}>
                {data?.fullVisaLevelStatistics?.pendingForDocument ?? noText}
              </StatNumber>
            </Stat>
            <Stat borderRadius={12} p={2} bg={'blue.100'}>
              <StatLabel fontSize={'xs'}>Yoxlama prosesində</StatLabel>
              <StatNumber fontSize={'md'}>
                {data?.fullVisaLevelStatistics?.inInspection ?? noText}
              </StatNumber>
            </Stat>
          </StatGroup>
          <StatGroup mb={5} gap={3}>
            <Stat borderRadius={12} p={2} bg={'blue.100'}>
              <StatLabel fontSize={'xs'}>Ləğv Edilmiş</StatLabel>
              <StatNumber fontSize={'md'}>
                {data?.fullVisaLevelStatistics?.cancelled ?? noText}
              </StatNumber>
            </Stat>
            <Stat borderRadius={12} p={2} bg={'blue.100'}>
              <StatLabel fontSize={'xs'}>Düzəliş gözləyən</StatLabel>
              <StatNumber fontSize={'md'}>
                {data?.fullVisaLevelStatistics?.pendingForDocumentRecovery ??
                  noText}
              </StatNumber>
            </Stat>
            <Stat borderRadius={12} p={2} bg={'blue.100'}>
              <StatLabel fontSize={'xs'}>Təsdiqlənmiş</StatLabel>
              <StatNumber fontSize={'md'}>
                {data?.fullVisaLevelStatistics?.documentsConfirmed ?? noText}
              </StatNumber>
            </Stat>
          </StatGroup>
          <Box position="relative" mb={1} padding="15">
            <Divider />
            <AbsoluteCenter bg="white" px="2">
              {'Ödəniş'}
            </AbsoluteCenter>
          </Box>
          <Flex justifyContent="space-between" gap={10}>
            <Box flex="1" minW="0">
              {' '}
              {/* This ensures the box can shrink below its base size if needed */}
              <Heading
                fontWeight={400}
                mb={1}
                fontSize={{ base: '1xl', sm: '2xl', md: 'lg' }}
                color="gray.800"
              >
                Ümumi ödəniş (aylıq)
              </Heading>
              <StatGroup mb={5} gap={3}>
                <Stat borderRadius={12} p={2} bg={'blue.100'}>
                  <StatLabel fontSize={'xs'}>Aylıq</StatLabel>
                  <StatNumber fontSize={'md'}>
                    {data?.monthlyPaymentStatistics ?? noText}
                  </StatNumber>
                </Stat>
              </StatGroup>
            </Box>
            <Box flex="1" minW="0">
              {' '}
              {/* Repeat the same for the annual stats */}
              <Heading
                fontWeight={400}
                mb={1}
                fontSize={{ base: '1xl', sm: '2xl', md: 'lg' }}
                color="gray.800"
              >
                Ümumi ödəniş(illik)
              </Heading>
              <StatGroup mb={5} gap={3}>
                <Stat borderRadius={12} p={2} bg={'blue.100'}>
                  <StatLabel fontSize={'xs'}>İllik</StatLabel>
                  <StatNumber fontSize={'md'}>
                    {data?.fullPaymentStatistics ?? noText}
                  </StatNumber>
                </Stat>
              </StatGroup>
            </Box>
          </Flex>
        </>
      ) : (
        <Skeleton height={350} />
      )}
    </div>
  );
}

export default Stats;
